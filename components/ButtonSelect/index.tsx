import {Button, HStack} from "@chakra-ui/react";
import {useState} from "react";

export interface ButtonSelectItem {
  text: string;
  value: string;
}

export interface ButtonSelectProps {
  items: ButtonSelectItem[];
  onChange: (item: ButtonSelectItem) => void;
}

export function ButtonSelect({
  items,
  onChange
}: ButtonSelectProps) {
  const [selected, setSelected] = useState<ButtonSelectItem>(items[0]);

  const onClick = (item: ButtonSelectItem) => {
    setSelected(item);
    onChange(item);
  }

  return (
    <HStack spacing='24px'>
      {items.map(item => (
        <Button
          key={item.value}
          onClick={() => onClick(item)}
          color="white"
          bg={selected === item ? '#FBA140' : 'gray.500'}
        >
          {item.text}
        </Button>
      ))}
    </HStack>
  );
}
