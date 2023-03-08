import React, { useState, useEffect } from "react";
import { Container, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Navigation } from "./components/Navigation";
import { PokemonCard } from "./components/PokemonCard";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokeCards, setPokeCards] = useState([]);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);

  useEffect(() => {
    fetch(pokeApi)
      .then((res) => res.json())
      .then((data) => {
        setPokeCards(data.results);
        // console.log(data.results);
      })
      .catch((err) => {
        console.log("Pokemon not found", err);
      });
  }, []);

  handleChange = (e) => {
    const value = e.target.value;
    const regex = new RegExp(value, "gi");
    const filtered = pokeCards.filter((pokemon) => {
      return pokemon.name.match(regex);
    });

    setPokemonFiltered(filtered);
  };

  return (
    <div data-testid="app">
      <Navigation />
      <Container>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text
            type="search"
            variant="outline-secondary"
            id="search"
          >
            Search
          </InputGroup.Text>
          <Form.Control
            className="search-input"
            placeholder="Pokemon Name"
            aria-label="Pokemon Name"
            name="search"
            onChange={handleChange}
          />
        </InputGroup>
        <br />
        <Row xs={1} md={4} className="g-4">
          {pokemonFiltered.map((card) => (
            <Col key={card.name}>
              <PokemonCard name={card.name} url={card.url} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export { App };
