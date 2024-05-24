function convertToEST() {
    const timeInput = document.getElementById('time').value;
    const ampm = document.getElementById('ampm').value;
    const timezone = document.getElementById('timezone').value.split(' ')[0]; // Extract timezone abbreviation

    // Validate time input
    const timePattern = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timePattern.test(timeInput)) {
        alert('Please enter a valid time in HH:MM format.');
        return;
    }

    const [hours, minutes] = timeInput.split(':');
    let hours24 = parseInt(hours);

    if (ampm === 'PM' && hours24 < 12) {
        hours24 += 12;
    } else if (ampm === 'AM' && hours24 === 12) {
        hours24 = 0;
    }

    const date = new Date();
    date.setHours(hours24, parseInt(minutes));

    const timezoneOffsets = {
        PST: -8,
        MST: -7,
        CST: -6,
        EST: -5,
        GMT: 0,
        UTC: 0,
        IST: 5.5,
        AEST: 10,
        CET: 1,
        EET: 2,
        BST: 1
    };

    const estOffset = -5;
    const selectedOffset = timezoneOffsets[timezone];

    const estTime = new Date(date.getTime() + (estOffset - selectedOffset) * 60 * 60 * 1000);

    const estHours = estTime.getHours();
    const estMinutes = estTime.getMinutes().toString().padStart(2, '0');
    const estAmpm = estHours >= 12 ? 'PM' : 'AM';
    const estFormattedHours = estHours % 12 || 12;

    const result = `${estFormattedHours}:${estMinutes} ${estAmpm} EST`;
    document.getElementById('result').innerText = result;
    document.getElementById('original-input').innerText = `Original Input: ${timeInput} ${ampm} in ${timezone}`;
}
