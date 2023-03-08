import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Pokemon not found", err);
      });
  }, [url]);

  return (
    <>
      <Card style={{ width: "18rem", height: "100%" }}>
        <Card.Img variant="top" src={pokemon?.sprites.front_default} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text as="div">
            <p>Abilities</p>
            {pokemon?.abilities.map((pokeAbility) => (
              <ul>
                <li>{pokeAbility.ability.name}</li>
              </ul>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export { PokemonCard };
