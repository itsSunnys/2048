import "../Blocks/Block.css";
function Block(props) {
  const block = " block";

  if (props.animation)
    return <div className="animation ">{props.valueRow}</div>;
  else return <div className="block ">{props.valueRow}</div>;
}

export default Block;
