function randomValidColor() {
	return Math.floor(Math.random()*256);
}
export function generateColors (size, opacity) {
	const colors = []
	for(let i = 0; i < size; i++){
  	colors.push(`rgba(${randomValidColor()}, ${randomValidColor()}, ${randomValidColor()}, ${opacity})`)
  }
  return colors;
}