import { INITIAL_WARDROBE_ITEMS } from './sampleData';

const STORAGE_KEY = 'grwm_wardrobe_items_v1';
const SAVED_OUTFITS_KEY = 'grwm_saved_outfits_v1';

export const getStoredItems = () => {
  if (typeof window === 'undefined') return INITIAL_WARDROBE_ITEMS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WARDROBE_ITEMS));
      return INITIAL_WARDROBE_ITEMS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load items from storage:', err);
    return INITIAL_WARDROBE_ITEMS;
  }
};

export const saveItemsToStorage = (items) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save items to storage:', err);
  }
};

export const addStoredItem = (newItem) => {
  const items = getStoredItems();
  const itemToAdd = {
    ...newItem,
    id: `item-${Date.now()}`,
    createdAt: new Date().toISOString(),
    lastWorn: newItem.lastWorn || null,
    favorite: newItem.favorite || false,
    quantity: newItem.quantity || 1
  };
  const updated = [itemToAdd, ...items];
  saveItemsToStorage(updated);
  return updated;
};

export const updateStoredItem = (id, updatedFields) => {
  const items = getStoredItems();
  const updated = items.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveItemsToStorage(updated);
  return updated;
};

export const deleteStoredItem = (id) => {
  const items = getStoredItems();
  const updated = items.filter(item => item.id !== id);
  saveItemsToStorage(updated);
  return updated;
};

export const resetWardrobeToSample = () => {
  saveItemsToStorage(INITIAL_WARDROBE_ITEMS);
  return INITIAL_WARDROBE_ITEMS;
};

export const getSavedOutfits = () => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(SAVED_OUTFITS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

export const saveOutfitToStorage = (outfit) => {
  if (typeof window === 'undefined') return [];
  const outfits = getSavedOutfits();
  const newOutfit = {
    ...outfit,
    id: `outfit-${Date.now()}`,
    savedAt: new Date().toISOString()
  };
  const updated = [newOutfit, ...outfits];
  localStorage.setItem(SAVED_OUTFITS_KEY, JSON.stringify(updated));
  return updated;
};
