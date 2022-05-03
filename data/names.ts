export type nameGender = ('Boy' | 'Unisex' | 'Girl')
export type nameTrend = ('Trendy' | 'Any' | 'Unique')
export type nameLength = ('Short' | 'Medium' | 'Long')

interface ChildName {
	id: number
	name: string
	gender: nameGender
	popularity: nameTrend
	length: nameLength
}

let uIdCounter: number = 0

const generateChildName = (minLength: number = 3, maxLength: number = 25): ChildName => {
	uIdCounter++
	const rngLength = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength)
	const rngPopularity = Math.ceil(Math.random() * 2)
	const rngGender = Math.ceil(Math.random() * 3)

	const getRngLetter = (): number => {
	  return Math.ceil(Math.random() * (90 - 65 + 1) + 65)
	}
	let generatedName: string = ''
	for (let i = 0; i < rngLength; i++) {
		const letter = getRngLetter()
		generatedName += String.fromCharCode(letter)
	}

	const figureOutLengthVariant = (): nameLength => {
		const lengthStep = Math.ceil((maxLength - minLength) / 3)
		return rngLength <= (minLength + lengthStep) ? 'Short' :
			rngLength <= (minLength + lengthStep * 2) ? 'Medium' :
				'Long'
	}
	return {
		id: uIdCounter,
		name: generatedName.toLocaleLowerCase(),
		gender: rngGender === 1 ? 'Boy': rngGender === 2 ? 'Unisex' : 'Girl',
		popularity: rngPopularity === 1 ? 'Trendy' : 'Unique',
		length: figureOutLengthVariant()
	}
}

const generateChildNameList = (len: number = 10): ChildName[] => {
	let res: ChildName[] = []
	for (let i = 0; i < len; i++) {
		res.push(generateChildName())
	}
	return res
}

export const childNamesList: ChildName[] = generateChildNameList(200)
