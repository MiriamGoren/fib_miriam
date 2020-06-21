let clck = document.getElementById("myBtn");
clck.addEventListener("click", on_click_handler);

function Loader() {
  let OnOff = document.getElementById("Loader");
  OnOff.classList.toggle("d-inline-block");
}

function alertOn() {
  let alert = document.getElementById("alert");
  alert.style.visibility = "visible";
  let alertBox = document.getElementById("num");
  alertBox.classList.add("text-danger", "border-danger");
}

function alertOff() {
  let alert = document.getElementById("alert");
  alert.style.visibility = "hidden";
  let alertBox = document.getElementById("num");
  alertBox.classList.remove("text-danger", "border-danger");
  
}

function Error42() {
  let red = document.getElementById("result");
  red.classList.add(
    "text-decoration-none",
    "text-danger",
    "font-weight-lighter",
    "small"
  );
}

function resetFunction() {
  var resetResult = document.getElementById("result");
  if ((resetResult.className == "text-danger")) {
    alertOff();
  }
  alertOff();
  var resetAlert = document.getElementById("alert");
  if (resetAlert.style.visibility === "visible") {
    resetAlert.style.visibility = "invisible";
  } 

  var resetNum = document.getElementById("num");
  if (resetNum.style.color === "#dc3545") {
    resetNum.style.color = "#495057";
  }
  
  
}

function on_click_handler() {
  resetFunction();
  Loader();
  document.getElementById("result").innerHTML = " "
  number = document.getElementById("num").value;
  if (number==0 || number==1) {
    Loader();
    return number;
  }
  if (number > 50) {
    Loader();
    alertOn();
    return;
  }
  var checkbox_elem = document.getElementById("myCheck");
  let checkbox_is_checked = checkbox_elem.checked;
  if (checkbox_is_checked) {
    fetch_data_from_server_ex5(number);
  } else {
    noServer(number);
  }
}

function looping_wrapper()
{
    x = document.getElementById("num").value;
    looping(x) 
}

function looping(x) {
  if ( x == 0 || x == 1)
  {
      return x;
  }
  let a = 0,
    b = 1,
    f = 1;
  for (let i = 2; i <= x; i++) {
    f = a + b;
    a = b;
    b = f;
  }

  document.getElementById("result").innerHTML = f;
  return f;
}
function noServer (number) {
  console.log("ex4");
  Loader();
  if (number < 0)
  {
    Error42();
    document.getElementById("result").innerHTML = "Error: number cant be smaller than 0"
    return;
  }
  else if (number == 42)
  {
    Error42();
    document.getElementById("result").innerHTML = "42 is the meaning of life"
    return;
  }
  else {
    looping_wrapper();
  }
  
}

function fetch_data_from_server_ex5(number) {
  
  console.log("ex5");


  url = "http://127.0.0.1:5050/fibonacci/";
  url_with_data = url + number;
  console.log(url_with_data);

  fetch(url_with_data).then(function (resp) {
    if (resp.ok) {
      return resp.json().then(function (data) {
        console.log(data);
        console.log(data.result);
        Loader();
        document.getElementById("result").innerText = data.result;
      });
    }

    Loader();
    Error42();

    return resp.text().then(function (resp) {
      document.getElementById("result").innerText = `Error of server: ${resp}`;
    });
  });
}

const resultsList = document.querySelector("#resultsList");
window.addEventListener("load", () => {
  fetch("http://localhost:5050/getFibonacciResults ").then((response) => {
    if (response.ok) {
      response.json().then((jsonData) => {
        let array1 = jsonData.results;
        let correctDate;
        array1 = array1.sort(function (a, b) {
          return b.createdDate - a.createdDate;
        });

        let last_element_idx = Math.min(array1.length, 5);
        for (let i = 0; i < last_element_idx; i++) {
          correctDate = new Date(array1[i].createdDate).toString();
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.style.border.color = "black";
          resultsList.appendChild(
            li
          ).innerText = `The Fibonacci of ${array1[i].number} is ${array1[i].result} Calculated at ${correctDate}.`;
        }
      });
    }
  });
});
