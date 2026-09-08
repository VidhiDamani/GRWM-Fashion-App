// Color compatibility rules
const COLOR_HARMONY = {
  complementary: {
    'red': ['green', 'emerald', 'white', 'gold', 'black'],
    'blue': ['orange', 'yellow', 'gold', 'white', 'silver', 'tan'],
    'yellow': ['purple', 'blue', 'maroon', 'white'],
    'green': ['red', 'pink', 'gold', 'beige', 'white'],
    'purple': ['yellow', 'gold', 'silver', 'white'],
    'pink': ['green', 'teal', 'white', 'silver', 'grey'],
    'white': ['any'],
    'black': ['any'],
    'silver': ['any'],
    'gold': ['any']
  },
  analogous: {
    'red': ['pink', 'orange', 'maroon', 'crimson'],
    'blue': ['purple', 'teal', 'navy', 'cyan'],
    'yellow': ['orange', 'gold', 'mustard'],
    'green': ['teal', 'olive', 'mint'],
    'purple': ['magenta', 'violet', 'pink']
  }
};

const getColorHarmonyScore = (color1, color2) => {
  if (!color1 || !color2) return 5;
  const c1 = color1.toLowerCase();
  const c2 = color2.toLowerCase();

  if (c1 === 'black' || c2 === 'black' || c1 === 'white' || c2 === 'white') return 8;
  if (c1 === 'silver' || c2 === 'silver' || c1 === 'gold' || c2 === 'gold') return 9;

  if (COLOR_HARMONY.complementary[c1]?.includes('any') || COLOR_HARMONY.complementary[c2]?.includes('any')) return 8;
  if (COLOR_HARMONY.complementary[c1]?.includes(c2) || COLOR_HARMONY.complementary[c2]?.includes(c1)) return 10;
  if (COLOR_HARMONY.analogous[c1]?.includes(c2) || COLOR_HARMONY.analogous[c2]?.includes(c1)) return 7;

  if (c1 === c2) return 6; // Monochromatic
  return 4; // Standard combination
};

export const filterItems = (items, preferences) => {
  return items.filter(item => {
    // Occasion check
    if (preferences.occasion && preferences.occasion !== 'all') {
      const matchOccasion = Array.isArray(item.occasion) 
        ? item.occasion.includes(preferences.occasion) 
        : item.occasion === preferences.occasion;
      if (!matchOccasion) return false;
    }

    // Weather check
    if (preferences.weather === 'hot' || preferences.weather === 'sunny') {
      if (item.fabric === 'wool' || item.fabric === 'velvet') return false;
    }
    if (preferences.weather === 'chilly' || preferences.weather === 'cold') {
      if (item.fabric === 'chiffon' && item.category === 'top') return false;
    }

    // Formality check
    if (preferences.formality) {
      const targetFormality = Number(preferences.formality);
      if (Math.abs(item.formality - targetFormality) > 2) return false;
    }

    return true;
  });
};

export const scoreItem = (item, preferences) => {
  let score = 10; // Base score

  // Occasion score
  if (preferences.occasion && Array.isArray(item.occasion) && item.occasion.includes(preferences.occasion)) {
    score += 10;
  }

  // Vibe score
  if (preferences.vibe && preferences.vibe !== 'any') {
    if (item.vibe === preferences.vibe) score += 5;
  }

  // Formality bonus
  if (preferences.formality) {
    const diff = Math.abs(item.formality - Number(preferences.formality));
    if (diff === 0) score += 5;
    else if (diff <= 1) score += 2;
  }

  // Favorite bonus
  if (item.favorite) score += 4;

  // Last worn calculation
  if (item.lastWorn) {
    const daysSince = (Date.now() - new Date(item.lastWorn).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince > 7) score += 5;
    else if (daysSince < 3) score -= 5;
  } else {
    score += 5; // Never worn bonus
  }

  return score;
};

export const generateOutfits = (allItems, preferences) => {
  const filtered = filterItems(allItems, preferences);

  // If filtered returns too few items, relax filtering to ensure recommendations
  const pool = filtered.length >= 2 ? filtered : allItems;

  const scoredPool = pool.map(item => ({
    ...item,
    calculatedScore: scoreItem(item, preferences)
  }));

  const tops = scoredPool.filter(i => i.category === 'top').sort((a, b) => b.calculatedScore - a.calculatedScore);
  const bottoms = scoredPool.filter(i => i.category === 'bottom').sort((a, b) => b.calculatedScore - a.calculatedScore);
  const dresses = scoredPool.filter(i => i.category === 'dress').sort((a, b) => b.calculatedScore - a.calculatedScore);
  const footwear = scoredPool.filter(i => i.category === 'footwear').sort((a, b) => b.calculatedScore - a.calculatedScore);
  const accessories = scoredPool.filter(i => i.category === 'accessory').sort((a, b) => b.calculatedScore - a.calculatedScore);

  const generatedOutfits = [];

  // Type 1: Top + Bottom combinations
  for (let i = 0; i < Math.min(3, tops.length); i++) {
    for (let j = 0; j < Math.min(3, bottoms.length); j++) {
      const top = tops[i];
      const bottom = bottoms[j];
      const selectedFootwear = footwear[i % footwear.length] || footwear[0];
      const selectedAccessory = accessories[j % accessories.length] || accessories[0];

      const colorHarmony = getColorHarmonyScore(top.color, bottom.color);
      const totalScore = top.calculatedScore + bottom.calculatedScore + (selectedFootwear ? selectedFootwear.calculatedScore : 0) + (selectedAccessory ? selectedAccessory.calculatedScore : 0) + colorHarmony;

      const itemsList = [top, bottom];
      if (selectedAccessory) itemsList.push(selectedAccessory);
      if (selectedFootwear) itemsList.push(selectedFootwear);

      const matchPercentage = Math.min(99, Math.max(78, Math.round(totalScore * 1.8)));

      generatedOutfits.push({
        id: `gen-tb-${i}-${j}`,
        items: itemsList,
        totalScore,
        matchPercentage,
        colorHarmonyScore: colorHarmony,
        title: `${top.colorName || top.color} ${top.subcategory} + ${bottom.colorName || bottom.color} ${bottom.subcategory}`,
        tag: preferences.occasion && preferences.occasion !== 'all' ? `${preferences.occasion.toUpperCase()} EDITION` : 'EVERYDAY CHIC'
      });
    }
  }

  // Type 2: Dress / Saree / Anarkali combinations
  for (let k = 0; k < Math.min(3, dresses.length); k++) {
    const dress = dresses[k];
    const selectedFootwear = footwear[k % footwear.length] || footwear[0];
    const selectedAccessory = accessories[k % accessories.length] || accessories[0];

    const colorHarmony = getColorHarmonyScore(dress.color, selectedAccessory ? selectedAccessory.color : 'silver');
    const totalScore = (dress.calculatedScore * 2) + (selectedFootwear ? selectedFootwear.calculatedScore : 0) + (selectedAccessory ? selectedAccessory.calculatedScore : 0) + colorHarmony;

    const itemsList = [dress];
    if (selectedAccessory) itemsList.push(selectedAccessory);
    if (selectedFootwear) itemsList.push(selectedFootwear);

    const matchPercentage = Math.min(99, Math.max(82, Math.round(totalScore * 1.8)));

    generatedOutfits.push({
      id: `gen-dress-${k}`,
      items: itemsList,
      totalScore,
      matchPercentage,
      colorHarmonyScore: colorHarmony,
      title: `${dress.colorName || dress.color} ${dress.subcategory}`,
      tag: `${(dress.vibe || 'Ethnic').toUpperCase()} STATEMENT`
    });
  }

  // Sort by total score descending and take top 3 unique outfits
  const sortedOutfits = generatedOutfits.sort((a, b) => b.totalScore - a.totalScore);
  
  // Deduplicate combinations
  const uniqueOutfits = [];
  const seenTitles = new Set();
  for (const outfit of sortedOutfits) {
    if (!seenTitles.has(outfit.title)) {
      seenTitles.add(outfit.title);
      uniqueOutfits.push(outfit);
    }
    if (uniqueOutfits.length >= 3) break;
  }

  return uniqueOutfits;
};
