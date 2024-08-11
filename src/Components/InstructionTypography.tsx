interface props{
    instructions:string
}
export default function InstructionTypography(props:props) {
    const {instructions}= props
    // const formattedParagraph = instructions.replace(/(STEP)/g, '\n$1');
    
  return (
    <p className="WhiteSpacable smallFont">{instructions}</p>
  )
}
