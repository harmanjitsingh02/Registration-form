function validate_form1() {
    const phonePattern = /^[0-9]{10}$/;
    const phone = document.getElementById("phone").value;
    const zipcodePattern = /^[0-9]{6}$/;
    const zip = document.getElementById("zipcode").value;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    if (!zipcodePattern.test(zip)) {
        alert("Please enter a valid 6-digit zip code.");
        return false;
    }

    return true; // Submit the form if all validations pass
}

// jQuery for updating city options based on the selected state
$("#state").change(function() {
    const state = $(this).val();
    const citySelect = $("#city");

    citySelect.html('<option value="" disabled selected>Select your City</option>');

    const cities = {
        "Delhi": ["New Delhi", "Connaught Place", "Karol Bagh"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    };

    if (state && cities[state]) {
        $.each(cities[state], function(index, city) {
            citySelect.append(`<option value="${city}">${city}</option>`);
        });
    }
});