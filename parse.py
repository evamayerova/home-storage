from datetime import datetime, date
import argparse

def get_buying_frequency(f_path):
    first = True
    last_date = None
    groceries = {}
    for line in open(f_path):
        try:
            time, old, new, action, amount = line.split(',')
            d = datetime.strptime(time, '%d.%m.%Y %H:%M:%S')
            if action != "Bought":
                continue
            if old:
                groceries[old]["amount"] += float(amount)
                groceries[old]["times"].append(d)
            elif new:
                groceries[new] = {
                    "amount": float(amount),
                    "times": [d]
                }
        except Exception as e:
            pass

    for k, v in groceries.items():
        if len(v["times"]) == 1:
            continue
        delta = v["times"][-1] - v["times"][0]
        weeks = delta.days / 7
        weekly_usage = v["amount"] / weeks
        print(k, weekly_usage)
        

parser = argparse.ArgumentParser()
parser.add_argument("csv_file")
args = parser.parse_args()
get_buying_frequency(args.csv_file)