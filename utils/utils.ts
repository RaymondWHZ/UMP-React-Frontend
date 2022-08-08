
export function dispatch(action: () => any) {
  setTimeout(action, 0);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function arrayWithoutItem(array: any[], item: any) {
  const newArray = [...array]
  newArray.splice(array.indexOf(item), 1)
  return newArray
}
