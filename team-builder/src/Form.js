import React, { useState } from "react";
import "./App.css";
import Grimgore from './team-builder imgs/Grimgore.png'
import King_Belegar from './team-builder imgs/King_Belegar.png'
import Settra from './team-builder imgs/Warhammer_Tomb_Kings_Settra.png'
import Throgg from './team-builder imgs/Throgg.png'

export default function Form() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [characters, setCharacters] = useState(Characters);
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const change = (e) => {
        const { name, value } = e.target;
        setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    };
    
    const charUpdate = (characterId) => {
        const character = characters.find((f) => f.id === characterId);
        
        if (character) {
            setIsEditMode(true);
            setFormValues(character);
            setEditingId(characterId);
        }
    };
    

const submit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
        const character = characters.find((f) => f.id === editingId);
        
        if (character) {
            const toBeUpdated = { ...character };
            toBeUpdated.fname = formValues.fname || toBeUpdated.fname;
            toBeUpdated.lname = formValues.lname || toBeUpdated.lname;
            toBeUpdated.faction = formValues.faction || toBeUpdated.faction;
            toBeUpdated.alignment = formValues.alignment || toBeUpdated.alignment;
            toBeUpdated.img = formValues.img;
            const filteredCharacters = characters.filter((f) => f.id !== toBeUpdated.id);
            
            setCharacters([...filteredCharacters, toBeUpdated]);
            // reset the formsValue state
            setFormValues(initialFormValues);
            setEditingId(null);
            setIsEditMode(false);
        }
        return;
    }
    
    const lastCharactersId = characters[characters.length - 1].id;
    const newCharacter = {
        // needs identical structure to the other characters
      id: lastCharactersId + 1,
      fname: formValues.fname,
      lname: formValues.lname,
      faction: formValues.faction,
      alignment: formValues.alignment,
      img: formValues.img,
    };
    console.log(newCharacter);
    
    // use your setCharacters helper function
    setCharacters(characters.concat(newCharacter));
    // reset the formsValue state
    setFormValues(initialFormValues);
};

return (
    <div>
      <form onSubmit={submit} className="form">
        <label htmlFor="fnameInput">First Name: </label>
        <input
          onChange={change}
          value={formValues.fname}
          maxLength="15"
          placeholder="First Name"
          id="fnameinput"
          name="fname"
          type="text"
          />
        <br />
        <label htmlFor="lnameInput">Surname: </label>
        <input
          onChange={change}
          value={formValues.lname}
          maxLength="15"
          placeholder="Last Name"
          id="lnameinput"
          name="lname"
          type="text"
          />
        <br />

        <label htmlFor="lfactionInput">Faction: </label>
        <input
          onChange={change}
          value={formValues.faction}
          maxLength="15"
          placeholder="User Name"
          id="lfactioninput"
          name="faction"
          type="text"
          />
        <br />

        <label htmlFor="alignmentSelect">Alignment: </label>
        <select
          id="alignmentSelect"
          name="alignment"
          value={formValues.alignment}
          style={{ margin: "2rem" }}
          onChange={change}
          >
          <option value="">--</option>
          <option value="Forces of Order">Forces of Order</option>
          <option value="Forces of Chaos">Forces of Chaos</option>
          <option value="Forces of Destruction">Forces of Destruction</option>
          <option value="Forces of Death">Forces of Death</option>
        </select>
        <br />
        <label htmlFor="imgInput">Image URL </label>
        <input
          type="text"
          id="imgInput"
          name="img"
          placeholder = "Image URL"
          onChange={change}
          />
        <br />

        <button type="submit">{isEditMode ? "Update" : "Submit New Character"}</button>
        
      </form>
      {characters.map((character, idx) => (
          <div className="characterList" key={idx} style={{ border: "2px" }}>
            <img src = {character.img} alt = 'Character'/>
          <h3>
            {character.fname} {character.lname}
          </h3>
          <p>
            <em>faction: </em>
            {character.faction}
          </p>
          <p>
            <em>Favorite Weapon: </em>
            {character.favWeap}
          </p>
          <p>
            <em>Favorite Alignment: </em>
            {character.alignment}
          </p>
          <button onClick={() => charUpdate(character.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
const Characters = [
  {
    id: 1,
    fname: "Grimgor",
    lname: "Ironhide",
    faction: " The Greenskins",
    favWeap: "Gitsnik",
    alignment:'Forces of Destruction',
    img: Grimgore,
  },
  {
    id: 2,
    fname: "Settra",
    lname: "the Imperishable",
    faction: "Tomb Kings",
    favWeap: "Staff of Osiris",
    alignment:'Forces of Death',
    img: Settra,
  },
  {
    id: 3,
    fname: "Throgg,",
    lname: "King of the Trolls",
    faction: "Chaos",
    favWeap: "Warhammer",
    alignment:'Forces of Chaos',
    img: Throgg,
  },
  {
    id: 4,
    fname: "Belegar",
    lname: "Ironhammer",
    faction: "Dwarves",
    favWeap: "Hammer of Angrund",
    alignment:'Forces of Order',
    img: King_Belegar,
  },
];

const initialFormValues = {
  fname: "",
  lname: "",
  faction: "",
  favWeap: "",
  alignment:'',
  img: '',
};