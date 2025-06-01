// Vedic Numerology Calculator - JavaScript Implementation
// Converted from Python for better Node.js integration

function reduceToSingleDigit(number) {
  if ([11, 22, 33].includes(number)) {
    return number; // Don't reduce master numbers
  }

  while (number > 9) {
    let sumDigits = 0;
    for (let digit of number.toString()) {
      sumDigits += parseInt(digit);
    }
    number = sumDigits;
    if ([11, 22, 33].includes(number)) {
      break;
    }
  }
  return number;
}

function calculatePsychicNumber(day) {
  let psychicNum = day;
  while (psychicNum > 9) {
    let sumDigits = 0;
    for (let digit of psychicNum.toString()) {
      sumDigits += parseInt(digit);
    }
    psychicNum = sumDigits;
  }
  return psychicNum;
}

function calculateDestinyNumber(day, month, year) {
  const dobStr = day.toString() + month.toString() + year.toString();
  let totalSum = 0;
  for (let digit of dobStr) {
    totalSum += parseInt(digit);
  }

  let destinyNum = totalSum;
  while (destinyNum > 9 && ![11, 22, 33].includes(destinyNum)) {
    let sumDigits = 0;
    for (let digit of destinyNum.toString()) {
      sumDigits += parseInt(digit);
    }
    destinyNum = sumDigits;
    if ([11, 22, 33].includes(destinyNum)) {
      break;
    }
  }
  return destinyNum;
}

function getPlanetaryAssociation(number) {
  if ([11, 22, 33].includes(number)) {
    let reducedNum = number;
    while (reducedNum > 9) {
      let sumDigits = 0;
      for (let digit of reducedNum.toString()) {
        sumDigits += parseInt(digit);
      }
      reducedNum = sumDigits;
    }
    number = reducedNum;
  }

  const planets = {
    1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu", 5: "Mercury",
    6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars"
  };
  return planets[number] || "Unknown";
}

function constructLushoGrid(day, month, year) {
  const dobStr = day.toString() + month.toString() + year.toString();
  const digitsInDob = dobStr.split('').map(d => parseInt(d)).filter(d => d !== 0);

  const standardGridMap = {};
  const numberCounts = {};
  const presentNumbers = new Set();

  for (let n = 1; n <= 9; n++) {
    standardGridMap[n] = [];
    numberCounts[n] = 0;
  }

  for (let digit of digitsInDob) {
    if (digit >= 1 && digit <= 9) {
      standardGridMap[digit].push(digit);
      numberCounts[digit]++;
      presentNumbers.add(digit);
    }
  }

  const presentNumbersList = Array.from(presentNumbers).sort((a, b) => a - b);
  const missingNumbersList = [];
  for (let n = 1; n <= 9; n++) {
    if (!presentNumbers.has(n)) {
      missingNumbersList.push(n);
    }
  }

  return {
    grid_population: standardGridMap,
    present_numbers: presentNumbersList,
    missing_numbers: missingNumbersList,
    number_counts: numberCounts
  };
}

function getFriendlyUnfriendly(psychicNumber) {
  const relationships = {
    1: { friendly: [1, 2, 3, 4, 5, 7, 9], unfriendly: [6, 8] },
    2: { friendly: [1, 3, 4, 7, 8, 9], unfriendly: [2, 5, 6] },
    3: { friendly: [1, 2, 3, 5, 6, 8, 9], unfriendly: [4, 7] },
    4: { friendly: [1, 2, 5, 6, 7, 9], unfriendly: [3, 4, 8] },
    5: { friendly: [1, 3, 4, 5, 6, 7, 8, 9], unfriendly: [2] },
    6: { friendly: [3, 4, 5, 8, 9], unfriendly: [1, 2, 6, 7] },
    7: { friendly: [1, 2, 4, 5], unfriendly: [3, 6, 7, 8, 9] },
    8: { friendly: [2, 3, 5, 6], unfriendly: [1, 4, 7, 8, 9] },
    9: { friendly: [1, 2, 3, 4, 5, 6, 9], unfriendly: [7, 8] }
  };

  const rel = relationships[psychicNumber] || { friendly: [], unfriendly: [] };
  return {
    based_on_psychic: psychicNumber,
    friendly: rel.friendly,
    unfriendly: rel.unfriendly
  };
}

function calculateSimplifiedMahadasha(destinyNumber) {
  let startNum = destinyNumber;
  if ([11, 22, 33].includes(startNum)) {
    let reducedNum = startNum;
    while (reducedNum > 9) {
      let sumDigits = 0;
      for (let digit of reducedNum.toString()) {
        sumDigits += parseInt(digit);
      }
      reducedNum = sumDigits;
    }
    startNum = reducedNum;
  }

  const sequence = [];
  let currentNum = startNum;
  for (let i = 0; i < 9; i++) {
    const duration = currentNum;
    const planet = getPlanetaryAssociation(currentNum);
    sequence.push({ number: currentNum, planet: planet, duration: duration });
    currentNum = currentNum + 1;
    if (currentNum > 9) {
      currentNum = 1;
    }
  }
  return sequence;
}

function identifyYogas(presentNumbersSet) {
  const yogasDefinitions = [
    { combo: new Set([3, 1, 9]), name: "Raj Yog (Fame/Success)", description: "Indicates potential for Fame, Success, Wealth, Spiritual Path." },
    { combo: new Set([3, 7, 4]), name: "Kalsarp Yog (Numerology)", description: "Indicates potential for high success, but possible cash flow problems." },
    { combo: new Set([9, 7, 2]), name: "Courage Yog", description: "Indicates self-confidence, potential to be a 'real hero'." },
    { combo: new Set([3, 6, 2]), name: "Education Yoga", description: "Indicates potential as a good teacher, high intelligence, possibly manipulative." },
    { combo: new Set([1, 7, 8]), name: "Spiritual Success Yog", description: "Indicates potential for spiritual/socialist success, multiple income sources, possible legal issues, strong intuition." },
    { combo: new Set([2, 8, 4]), name: "Hard Work Success Yog", description: "Indicates success through hard work, but potential proneness to accidents or chronic health issues." },
    { combo: new Set([6, 7, 5]), name: "Business Success Yog", description: "Indicates potential for business success, creativity, skill, good money management, success in love/marriage." },
    { combo: new Set([9, 5, 4]), name: "Bandhan Yog", description: "Indicates goal achievement, quick decisions, hard work, potential property disputes." },
    { combo: new Set([3, 9, 8]), name: "Trine Yoga (3,9,8)", description: "Average education/family life, success after hard work." },
    { combo: new Set([6, 9, 4]), name: "Trine Yoga (6,9,4)", description: "Potential for extra-marital affairs, strong will, materialism." },
    { combo: new Set([1, 2, 4]), name: "Trine Yoga (1,2,4)", description: "Potential disturbances in education, life fluctuations." },
    { combo: new Set([9, 1, 7]), name: "L-Shape Combination (9,1,7)", description: "Strong will, potentially aggressive nature." },
    { combo: new Set([1, 3, 6]), name: "L-Shape Combination (1,3,6)", description: "Highly intellectual, knowledgeable, wise, potential as a good teacher." },
    { combo: new Set([7, 5, 4]), name: "L-Shape Kalsarp (7,5,4)", description: "Hard work, potential poor communication skills." },
    { combo: new Set([6, 7]), name: "Two Number Combination (6,7)", description: "Potential disinterest or less interest in luxury/love." },
    { combo: new Set([9, 5]), name: "Two Number Combination (9,5)", description: "Action-oriented, motivated, tendency to act before thinking." }
  ];

  const foundYogas = [];
  for (let yoga of yogasDefinitions) {
    if (isSubset(yoga.combo, presentNumbersSet)) {
      foundYogas.push({ name: yoga.name, description: yoga.description });
    }
  }

  return foundYogas;
}

function isSubset(setA, setB) {
  for (let elem of setA) {
    if (!setB.has(elem)) {
      return false;
    }
  }
  return true;
}

function getNumerologyAnalysis(day, month, year) {
  if (!(day >= 1 && day <= 31 && month >= 1 && month <= 12 && year > 0)) {
    throw new Error("Invalid Date of Birth provided.");
  }

  const analysis = {};
  analysis.input_dob = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  // Core Numbers
  const psychicNum = calculatePsychicNumber(day);
  const destinyNum = calculateDestinyNumber(day, month, year);
  analysis.psychic_number = {
    number: psychicNum,
    planet: getPlanetaryAssociation(psychicNum)
  };
  analysis.destiny_number = {
    number: destinyNum,
    planet: getPlanetaryAssociation(destinyNum)
  };

  // Planetary Associations
  analysis.planetary_associations = {};
  for (let n = 1; n <= 9; n++) {
    analysis.planetary_associations[n] = getPlanetaryAssociation(n);
  }

  // Lusho Grid
  const lushoData = constructLushoGrid(day, month, year);
  analysis.lusho_grid = lushoData;

  // Friendly/Unfriendly
  analysis.friendly_unfriendly = getFriendlyUnfriendly(psychicNum);

  // Simplified Mahadasha
  analysis.simplified_mahadasha_sequence = calculateSimplifiedMahadasha(destinyNum);

  // Yogas
  const presentNumbersSet = new Set(lushoData.present_numbers);
  analysis.yogas_found = identifyYogas(presentNumbersSet);

  return analysis;
}

export { getNumerologyAnalysis };