import { Chip } from "@mui/material";

interface props{
    tags:string
}
export default function TagsTypography(props:props) {
    const {tags}= props
    const array = tags.split(',').map(item => item.trim());
    
  return (
    <div>
      {array.map((item,index)=>(
        <Chip key={index} className="m-2 my-1" label={item} />
      ))}
    </div>
  )
}
