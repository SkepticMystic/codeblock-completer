export const splitAndTrim = (fields: string): string[] => {
	if (!fields || fields === "") return [];
	else return fields.split(",").map((str) => str.trim());
};
