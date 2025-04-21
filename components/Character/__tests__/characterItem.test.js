import { fireEvent, render } from "@testing-library/react-native";
import CharacterItem from "../CharacterItem";

describe("CharacterItem", () => {
	const mockCharacter = {
		id: 1,
		name: "Spider-man",
		description: "Your friendly neighborhood Spider-man",
		thumbnail: {
			path: "http://example.com/spider",
			extension: "jpg",
		},
	};
});

it("Renders character name correctly", () => {
  const { getByText } = render(<CharacterItem {...mockCharacter} />);
  expect(getByText("Spider-man")).toBeTruthy();
});

it("Calls onPress when pressed", () => {
  const mockOnPress = jest.fn();
  const { getByTestId } = render(<CharacterItem {...mockCharacter} onPress={mockOnPress} />);
  
  fireEvent.press(getByTestId("character-item"));
  expect(mockOnPress).toHaveBeenCalled();
})
