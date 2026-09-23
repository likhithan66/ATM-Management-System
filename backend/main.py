from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# =========================================
# CREATE FASTAPI APPLICATION
# =========================================

app = FastAPI()


# =========================================
# CORS CONFIGURATION
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# BANK ACCOUNT CLASS
# =========================================

class BankAccount:

    def __init__(self, account_number, name, balance):

        self.account_number = account_number
        self.name = name
        self.balance = balance


    # =====================================
    # DEPOSIT
    # =====================================

    def deposit(self, amount):

        if amount <= 0:

            raise ValueError(
                "Deposit amount must be greater than 0"
            )

        self.balance += amount


    # =====================================
    # WITHDRAW
    # =====================================

    def withdraw(self, amount):

        if amount <= 0:

            raise ValueError(
                "Withdrawal amount must be greater than 0"
            )

        if amount > self.balance:

            raise ValueError(
                "Insufficient balance"
            )

        self.balance -= amount


    # =====================================
    # CHECK BALANCE
    # =====================================

    def check_balance(self):

        return self.balance


    # =====================================
    # ACCOUNT DETAILS
    # =====================================

    def account_details(self):

        return {
            "account_number": self.account_number,
            "name": self.name,
            "balance": self.balance
        }


# =========================================
# CREATE ACCOUNT OBJECT
# =========================================

account1 = BankAccount(
    101,
    "Likhith AN",
    5000
)


# =========================================
# HOME API
# =========================================

@app.get("/")
def home():

    return {
        "message": "ATM Backend is running"
    }


# =========================================
# LOGIN API
# =========================================

@app.post("/login")
def login(password: str):

    if password == "1234":

        return {
            "success": True,
            "message": "Login successful"
        }

    return {
        "success": False,
        "message": "Incorrect password"
    }


# =========================================
# DEPOSIT API
# =========================================

@app.post("/deposit")
def deposit(amount: float):

    try:

        account1.deposit(amount)

        return {
            "success": True,
            "message": "Deposit successful",
            "balance": account1.balance
        }

    except ValueError as e:

        return {
            "success": False,
            "message": str(e),
            "balance": account1.balance
        }


# =========================================
# WITHDRAW API
# =========================================

@app.post("/withdraw")
def withdraw(amount: float):

    try:

        account1.withdraw(amount)

        return {
            "success": True,
            "message": "Withdrawal successful",
            "balance": account1.balance
        }

    except ValueError as e:

        return {
            "success": False,
            "message": str(e),
            "balance": account1.balance
        }


# =========================================
# BALANCE API
# =========================================

@app.get("/balance")
def balance():

    return {
        "success": True,
        "balance": account1.check_balance()
    }


# =========================================
# ACCOUNT DETAILS API
# =========================================

@app.get("/account")
def account():

    return {
        "success": True,
        "account": account1.account_details()
    }