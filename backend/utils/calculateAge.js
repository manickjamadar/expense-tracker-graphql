function calculateAge(birthDate) {
    // Parse the input date string into a Date object
    const today = new Date();
    
    // Calculate the difference in years, months, and days
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Adjust for negative days and months
    if (days < 0) {
        months -= 1;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years -= 1;
        months += 12;
    }
    
    return `${years} years ${months} months ${days} days`;
}
export default calculateAge;