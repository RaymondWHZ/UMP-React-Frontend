
export function dispatch(action: () => any) {
  setTimeout(action, 0);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
