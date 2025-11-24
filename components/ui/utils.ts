type ClassValue = string | number | boolean | undefined | null | ClassValue[];

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const result = clsx(...input);
      if (result) classes.push(result);
    }
  }
  
  return classes.join(' ');
}

function twMerge(...classLists: string[]): string {
  // Simple implementation that just concatenates classes
  // For a full implementation, you'd need tailwind-merge
  return classLists.filter(Boolean).join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
