function generateTicket(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const eventName = document.getElementById("event").value;
  const ticketID = "TCKT-" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("ticketName").textContent = name;
  document.getElementById("ticketEmail").textContent = email;
  document.getElementById("ticketDate").textContent = date;
  document.getElementById("ticketEvent").textContent = eventName;
  document.getElementById("ticketID").textContent = ticketID;

  const ticket = document.getElementById("ticket");
  ticket.classList.remove("hidden");

  generateQRCode(ticketID);
  document.querySelector("form").reset();
  ticket.scrollIntoView({ behavior: "smooth" });

  const ticketData = { name, email, date, eventName, ticketID };
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.push(ticketData);
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function generateQRCode(ticketID) {
  const qr = document.getElementById("qrcode");
  qr.innerHTML = "";
  new QRCode(qr, {
    text: ticketID,
    width: 100,
    height: 100
  });
}

function printTicket() {
  const content = document.getElementById("ticket").innerHTML;
  const original = document.body.innerHTML;

  document.body.innerHTML = `<div style="padding: 20px; font-family: Arial;">${content}</div>`;
  window.print();
  document.body.innerHTML = original;
  location.reload();
}
