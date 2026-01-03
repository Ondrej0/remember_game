import { useState, useEffect } from 'react'

//Settiung up props for MemoryCard component
type MemoryCardProps = {
  number: number;
  onClick: () => void;
}

//Exporting MemoryCard component
export default function MemoryCard({ number, onClick }: MemoryCardProps) {

  const [shouldShowLabel, setShouldShowLabel] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShouldShowLabel(false);
    }, 2000);
  }, []);

  function handleClick() {
    setShouldShowLabel(true);
    onClick();
  }



    return (
    <div className="bg-blue-200 hover:bg-blue-300 rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer " onClick={handleClick}>
        <p className="text-8xl font-extrabold">{shouldShowLabel ? number : '?'}</p>
    </div>
    )
  
}