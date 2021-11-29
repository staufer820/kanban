let test = document.getElementById("test");
fetch('http://localhost:8000/cards/0').then(res => res.json()).then(data => {
    test.innerHTML = data[0]["text"];
});