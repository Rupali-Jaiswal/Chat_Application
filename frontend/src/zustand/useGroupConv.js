import { create } from "zustand";

const useGroupConv = create((set) => ({
	selectedGroup: null,
	setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
	groupMessages: [{}],
	setgroupMessages: (groupMessages) => set({ groupMessages }),
}));

export default useGroupConv;
