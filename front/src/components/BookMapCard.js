import React from "react";
import { Item, Button } from "semantic-ui-react";

const BookMapCard = props => {
  const handleClick = () => {
    alert("Book Rented!");
  };

  return (
    <Item.Group>
      <Item>
        <Item.Image size="tiny" src={props.book.bookURL} />
        <Item.Content>
          <Item.Description>
            <strong>{props.book.title}</strong>
            <br />
            {" By, "}
            {props.book.author}
          </Item.Description>
          <Button onClick={handleClick}>Rent</Button>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default BookMapCard;
