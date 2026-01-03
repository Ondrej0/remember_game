import { useState, useEffect, use} from 'react'
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

// Setting up state variables for the first and second card selected by the user
const [firstCard, setFirstCard] = useState<number | null>(null);
const [secondCard, setSecondCard] = useState<number | null>(null);

// Setting up state variable to track number of matches found
const [matchesFound, setMatchesFound] = useState<number>(0);

//Setting up state variables for the game status
const [gameStatus, setGameStatus] = useState<string>('Playing');

// useEffect to prepare numbers when component mounts
useEffect(() => {
  prepareNumbersForCards();
}, []);

useEffect(() => {
  if (firstCard === null || secondCard === null) return;

  if (firstCard === secondCard) {
    setMatchesFound(prev => prev + 1);
  }

  // reset after short delay (so player can see)
  const timeout = setTimeout(() => {
    setFirstCard(null);
    setSecondCard(null);
  }, 800);

  return () => clearTimeout(timeout);
}, [secondCard]);


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

 //Function to hanlde comparing cards 
 function handleCardClick(cardNumber: number) {

  if (firstCard === null) {
    setFirstCard(cardNumber);
  } else {
    setSecondCard(cardNumber);
  }
}

  return (
    <> 
    <div className="w-[90vw] bg-slate-800/80 backdrop-blur rounded-xl shadow-lg p-6 m-6 border border-slate-700">
  <p className="text-slate-200 text-2xl md:text-3xl font-semibold tracking-wide flex flex-wrap gap-4">
    <span>Points: <span className="text-emerald-400">{matchesFound}</span></span>
    <span className="text-slate-400">|</span>
    <span>Card 1: <span className="text-indigo-400">{firstCard ?? '-'}</span></span>
    <span className="text-slate-400">|</span>
    <span>Card 2: <span className="text-indigo-400">{secondCard ?? '-'}</span></span>
  </p>
</div>
<div className="grid w-[90vw] h-[80vh] aspect-square grid-cols-2 grid-rows-2 gap-6 p-6 bg-slate-800/70 backdrop-blur rounded-2xl shadow-xl border border-slate-700">
  {preparedNumbers.map((number, index) => (   
    <MemoryCard
      key={index}
      number={number}
      onClick={() => handleCardClick(number)}
    />
  ))}
</div>

    </>
   
  )
}