const express = require("express");
const router = express.Router();

const rates = {
    NCR: { residential: 10.26, lowCommercial: 10.81, lowIndustrial: 9.69, highCommercial: 8.37, highIndustrial: 11.25 },
    Luzon: { residential: 10.13, lowCommercial: 10.52, lowIndustrial: 9.55, highCommercial: 8.33, highIndustrial: 11.26 },
    Visayas: { residential: 9.57, lowCommercial: 8.71, lowIndustrial: 8.78, highCommercial: 8.66, highIndustrial: 10.65 },
    Mindanao: { residential: 7.04, lowCommercial: 6.59, lowIndustrial: 6.55, highCommercial: 6.19, highIndustrial: 7.85 },
    "Other regions": { residential: 9.77, lowCommercial: 10.08, lowIndustrial: 8.93, highCommercial: 8.08, highIndustrial: 9.01 }
};

router.post("/calculate", (req, res) => {
    const { prevUsage, presUsage, region, classification } = req.body;

    if (!prevUsage || !presUsage || !region || !classification || prevUsage > presUsage) {
        return res.status(400).json({ error: "Invalid input" });
    }

    let totalConsumption = presUsage - prevUsage;
    let rate = rates[region][classification];
    let consumptionBill = totalConsumption * rate;

    let breakdown = {
        totalConsumption: totalConsumption.toFixed(2),
        consumptionBill: consumptionBill.toFixed(2),
        generationCharge: (consumptionBill * 0.55).toFixed(2),
        transmissionCharge: (consumptionBill * 0.101).toFixed(2),
        distributionCharge: (consumptionBill * 0.175).toFixed(2),
        taxes: (consumptionBill * 0.117).toFixed(2),
        otherTaxes: (consumptionBill * 0.057).toFixed(2)
    };

    res.json(breakdown);
});

module.exports = router;
