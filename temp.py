import json
# f = open('assets/verbal_ques.csv', 'r+')
f_q = open('assets/math_ques.txt', 'r')
f_v = open('assets/verbal_ques.txt', 'r')
f = open('assets/data_1.json', 'w+')

dict1 = {"verbal": {}, "quant": {}}
dict_v = {}
dict_q = {}

for line in f_v:
    line = line.rstrip()
    line = line.split(",")

    key = int(line[1], 10)
    line[0] = line[0] if int(line[0].split("-")[0]) >= 10 else f'0{line[0]}'
    line[0] = line[0] if int(line[0].split(
        "-")[2]) >= 10 else f'{line[0].split("-")[0]}-{line[0].split("-")[1]}-0{line[0].split("-")[2]}'
    if key not in dict_v:
        dict_v[key] = [line[0]]
    else:
        dict_v[key].append(line[0])

for line in f_q:
    line = line.rstrip()
    line = line.split(",")

    key = int(line[1], 10)
    line[0] = line[0] if int(line[0].split("-")[0]) >= 10 else f'0{line[0]}'
    line[0] = line[0] if int(line[0].split(
        "-")[2]) >= 10 else f'{line[0].split("-")[0]}-{line[0].split("-")[1]}-0{line[0].split("-")[2]}'
    if key not in dict_q:
        dict_q[key] = [line[0]]
    else:
        dict_q[key].append(line[0])

dict1["verbal"] = dict_v
dict1["quant"] = dict_q

json.dump(dict1, f, indent=4, sort_keys=False)

f.close()
f_q.close()
f_v.close()
