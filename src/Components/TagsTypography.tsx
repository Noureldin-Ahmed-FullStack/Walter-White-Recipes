import { Chip } from "@mui/material";

interface props {
  tags: string
}
export default function TagsTypography(props: props) {
  const { tags } = props
  try {
    const array = tags.split(',').map(item => item.trim());
    return (
      <div>
        {array.map((item, index) => (
          <Chip key={index} color="warning" onClick={() => { }} className="me-3 my-1" label={item} />
        ))}
      </div>
    )
  } catch (error) {
    return (<></>)
  }

}
