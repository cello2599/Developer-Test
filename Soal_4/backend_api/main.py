from flask import Flask, request, jsonify
from flask_cors import CORS
from z3 import *
from itertools import permutations

app = Flask(__name__)
CORS(app)

def generate_permutations(numbers):
    return [list(p) for p in permutations(numbers)]

def find_expression(numbers,target):
    n = len(numbers)

    # Definisikan variabel Z3 untuk operator (+, -, *)
    ops = [Int(f'op_{i}') for i in range(n-1)]

    # Definisikan variabel Z3 untuk membuka dan menutup tanda kurung
    open_paren = [Bool(f'open_{i}') for i in range(n)]
    close_paren = [Bool(f'close_{i}') for i in range(n)]

    s = Solver()

    #set constrain untuk operator
    for op in ops:
        s.add(Or(op == 0, op == 1, op == 2))  # 0 = +, 1 = -, 2 = *

    # Set constraint untuk tanda kurung: open harus sebelum close
    for i in range(n - 1):
        # Pastikan tidak ada close paren sebelum open paren
        s.add(Implies(close_paren[i], open_paren[i]))
        s.add(Implies(open_paren[i], Or([close_paren[j] for j in range(i, n - 1)])))

    # Dapatkan semua permutasi dari deret angka
    all_permutations = generate_permutations(numbers)

    # Coba setiap permutasi untuk mencari solusi
    for permuted_numbers in all_permutations:
        symbolic_expr = permuted_numbers[0]
        for i in range(n - 1):
            symbolic_expr = If(ops[i] == 0, symbolic_expr + permuted_numbers[i + 1],
                               If(ops[i] == 1, symbolic_expr - permuted_numbers[i + 1],
                                  symbolic_expr * permuted_numbers[i + 1]))

        s.push()  # Menyimpan state solver saat ini
        s.add(symbolic_expr == target)

        # Cari solusi
        if s.check() == sat:
            m = s.model()
            # Rekonstruksi ekspresi dari model yang dihasilkan oleh Z3
            expr_str = str(permuted_numbers[0])
            for i in range(n - 1):
                if m[open_paren[i]] == True:  # Tambahkan '(' jika terbuka
                    expr_str += f'({expr_str}'

                if m[ops[i]].as_long() == 0:
                    expr_str += f' + {permuted_numbers[i + 1]}'
                elif m[ops[i]].as_long() == 1:
                    expr_str += f' - {permuted_numbers[i + 1]}'
                elif m[ops[i]].as_long() == 2:
                    expr_str += f' * {permuted_numbers[i + 1]}'

                if m[close_paren[i]] == True:  # Tambahkan ')' jika ditutup
                    expr_str += ' ) '

            return expr_str
        s.pop()  # Kembalikan state solver ke sebelum menambahkan constraint untuk permutasi ini

    return "Tidak ada solusi yang ditemukan."

@app.route('/', methods=['GET'])
def test():
    return "Server Ready"

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    numbers = data['numbers']  # array of numbers
    target = data['target']  # target value
    result = find_expression(numbers, target)
    return jsonify({'result': result})

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True, port=5000)