document.getElementById("compute").addEventListener("click", async function () {
    let accountNumber = document.getElementById("accountNumber").value;
    let accountName = document.getElementById("accountName").value;
    let address = document.getElementById("address").value;
    let prevUsage = parseFloat(document.getElementById("prevUsage").value);
    let presUsage = parseFloat(document.getElementById("presUsage").value);
    let region = document.getElementById("region").value;
    let classification = document.getElementById("classification").value;

    if (isNaN(prevUsage) || isNaN(presUsage) || prevUsage > presUsage) {
        alert("Invalid input! Ensure numerical values and Present Usage is greater.");
        return;
    }

    if (!accountNumber || !accountName || !address) {
        alert("Please fill in all fields.");
        return;
    }

    let response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prevUsage, presUsage, region, classification })
    });

    let data = await response.json();

    // Display results dynamically
    document.getElementById("totalConsumption").textContent = data.totalConsumption + " kWh";
    document.getElementById("consumptionBill").textContent = "₱" + data.consumptionBill;
    document.getElementById("generationCharge").textContent = "₱" + data.generationCharge;
    document.getElementById("transmissionCharge").textContent = "₱" + data.transmissionCharge;
    document.getElementById("distributionCharge").textContent = "₱" + data.distributionCharge;
    document.getElementById("taxes").textContent = "₱" + data.taxes;
    document.getElementById("otherTaxes").textContent = "₱" + data.otherTaxes;
});
