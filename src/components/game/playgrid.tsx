import { useState, useEffect} from 'react'
import MemoryCard from './MemoryCard'

// PlayGrid Component where all game logic happens
export default function PlayGrid() {

//Setting up state variables fro dispalying the emory cards
const [numberOfCards, setNumberOfCards] = useState<number>(4);
const [numberOfRows, setNumberOfRows] = useState<number>(2);
const [numberOfColumns, setNumberOfColumns] = useState<number>(2);  

// Setting up state variables for the numbers to be displayed on the cards
const [numbers, setNumbers] = useState<number[]>([1, 2]);
const [preparedNumbers, setPreparedNumbers] = useState<number[]>([]);

useEffect(() => {
  prepareNumbersForCards();
}, []);

// Function to prepare numbers for the memory cards
function prepareNumbersForCards() {
   const numberItemsDoubled: number[] = [...numbers, ...numbers];
   const shuffled = shuffleNumbers(numberItemsDoubled);
   setPreparedNumbers(shuffled);
}

//Function to shuffle numbers and return shuffled array
function shuffleNumbers(numbers: number[]): number[] {
  const shuffled = [...numbers];    

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

  return (
    <> 
        <div className="grid w-[90vw] h-[90vh] grid-cols-2 grid-rows-2 gap-2 p-4 bg-white rounded shadow-md">
            {preparedNumbers.map((number, index) => (   
                <MemoryCard key={index} number={number} />
            ))}
        </div>
    </>
   
  )
}