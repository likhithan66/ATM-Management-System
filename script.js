// =====================================
// BACKEND URL
// =====================================

const API_URL = "http://127.0.0.1:8000";


// =====================================
// LOGIN
// =====================================

async function login() {

    let password =
        document.getElementById("password").value;


    if (password === "") {

        document.getElementById("message").innerText =
            "Please enter password";

        return;
    }


    try {

        let response = await fetch(
            API_URL +
            "/login?password=" +
            encodeURIComponent(password),
            {
                method: "POST"
            }
        );


        let data = await response.json();


        if (data.success) {

            window.location.href = "atm.html";

        } else {

            document.getElementById("message").innerText =
                data.message;
        }

    } catch (error) {

        document.getElementById("message").innerText =
            "Backend connection failed";

        console.error(error);
    }
}


// =====================================
// DEPOSIT
// =====================================

async function deposit() {

    let amount =
        document.getElementById("depositAmount").value;


    if (amount === "") {

        document.getElementById("message").innerText =
            "Please enter amount";

        return;
    }


    try {

        let response = await fetch(
            API_URL +
            "/deposit?amount=" +
            encodeURIComponent(amount),
            {
                method: "POST"
            }
        );


        let data = await response.json();


        document.getElementById("message").innerText =
            data.message;


        if (data.success) {

            document.getElementById("depositAmount").value = "";

        }

    } catch (error) {

        document.getElementById("message").innerText =
            "Backend connection failed";

        console.error(error);
    }
}


// =====================================
// WITHDRAW
// =====================================

async function withdraw() {

    let amount =
        document.getElementById("withdrawAmount").value;


    if (amount === "") {

        document.getElementById("message").innerText =
            "Please enter amount";

        return;
    }


    try {

        let response = await fetch(
            API_URL +
            "/withdraw?amount=" +
            encodeURIComponent(amount),
            {
                method: "POST"
            }
        );


        let data = await response.json();


        document.getElementById("message").innerText =
            data.message;


        if (data.success) {

            document.getElementById("withdrawAmount").value = "";

        }

    } catch (error) {

        document.getElementById("message").innerText =
            "Backend connection failed";

        console.error(error);
    }
}


// =====================================
// CHECK BALANCE
// =====================================

async function loadBalance() {

    try {

        let response = await fetch(
            API_URL + "/balance"
        );


        let data = await response.json();


        document.getElementById("balance").innerText =
            "₹ " + data.balance;

    } catch (error) {

        document.getElementById("balance").innerText =
            "Backend connection failed";

        console.error(error);
    }
}


// =====================================
// ACCOUNT DETAILS
// =====================================

async function loadAccountDetails() {

    try {

        let response = await fetch(
            API_URL + "/account"
        );


        let data = await response.json();


        let account = data.account;


        document.getElementById("accountNumber").innerText =
            account.account_number;


        document.getElementById("accountName").innerText =
            account.name;


        document.getElementById("accountBalance").innerText =
            account.balance;

    } catch (error) {

        document.getElementById("accountNumber").innerText =
            "Connection failed";

        console.error(error);
    }
}


// =====================================
// PAGE NAVIGATION
// =====================================

function goToWithdraw() {

    window.location.href = "withdraw.html";
}


function goToDeposit() {

    window.location.href = "deposit.html";
}


function goToBalance() {

    window.location.href = "balance.html";
}


function goToAccount() {

    window.location.href = "account.html";
}


function goToATM() {

    window.location.href = "atm.html";
}


function goHome() {

    window.location.href = "index.html";
}


// =====================================
// PAGE LOAD
// =====================================

window.addEventListener(
    "DOMContentLoaded",
    function () {


        // Balance page

        if (
            document.getElementById("balance")
        ) {

            loadBalance();
        }


        // Account page

        if (
            document.getElementById("accountNumber")
        ) {

            loadAccountDetails();
        }

    }
);