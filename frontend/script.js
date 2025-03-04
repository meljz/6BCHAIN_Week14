document.getElementById("compute").addEventListener("click", async function () {
    let prevUsage = parseFloat(document.getElementById("prevUsage").value);
    let presUsage = parseFloat(document.getElementById("presUsage").value);
    let region = document.getElementById("region").value;
    let classification = document.getElementById("classification").value;

    if (isNaN(prevUsage) || isNaN(presUsage) || prevUsage > presUsage) {
        alert("Invalid input! Ensure numerical values and Present Usage is greater.");
        return;
    }

    let response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prevUsage, presUsage, region, classification })
    });

    let data = await response.json();

    document.getElementById("totalConsumption").textContent = data.totalConsumption + " kWh";
    document.getElementById("consumptionBill").textContent = "₱" + data.consumptionBill;
    document.getElementById("generationCharge").textContent = "₱" + data.generationCharge;
    document.getElementById("transmissionCharge").textContent = "₱" + data.transmissionCharge;
    document.getElementById("distributionCharge").textContent = "₱" + data.distributionCharge;
    document.getElementById("taxes").textContent = "₱" + data.taxes;
    document.getElementById("otherTaxes").textContent = "₱" + data.otherTaxes;
});
