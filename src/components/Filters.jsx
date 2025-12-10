import { useState } from "react";
import { getGenres } from "../api/tmdb";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Box = styled.div`
	padding: 12px;
	border-bottom: 1px solid #eee;

	display: flex;
	gap: 12px;
	flex-wrap: wrap;

	/* Make filters stack cleanly on very small screens */
	@media (max-width: 480px) {
		flex-direction: column;
		gap: 10px;
	}

	select,
	input {
		padding: 8px 10px;
		border-radius: 6px;
		border: 1px solid #ccc;
		font-size: 15px;
		background: #fff;

		/* makes controls evenly sized when wrapping */
		flex: 1;
		min-width: 140px;

		@media (max-width: 480px) {
			width: 100%;
			min-width: 0;
		}
	}
`;

export default function Filters({ onChange }) {
	const [selected, setSelected] = useState({
		genre: "",
		year: "",
		minVote: "",
	});

	const {
		data: genres = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["genres"],
		queryFn: getGenres,
		staleTime: 1000 * 60 * 60, // 1 hour cache
	});

	function update(k, v) {
		const next = { ...selected, [k]: v };
		setSelected(next);
		onChange(next);
	}
	return (
		<Box>
			<select value={selected.genre} onChange={(e) => update("genre", e.target.value)}>
				<option value="">All genres</option>
				{isLoading && <option>Loading...</option>}
				{isError && <option>Error loading genres</option>}
				{genres.map((g) => (
					<option key={g.id} value={g.id}>
						{g.name}
					</option>
				))}
			</select>
			<input placeholder="Year" maxLength={4} value={selected.year} onChange={(e) => update("year", e.target.value)} />
			<input placeholder="Min rating (0-10)" value={selected.minVote} onChange={(e) => update("minVote", e.target.value)} />
		</Box>
	);
}
