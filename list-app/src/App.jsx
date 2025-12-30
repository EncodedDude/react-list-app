import { useState } from "react";
import styles from "./app.module.css";

function App() {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");

	let isValueValid = value.length < 3 ? false : true;

	const onInputButtonClick = () => {
		const promptValue = prompt("Введите значение");
		if (promptValue.length < 3) {
			setError("Введенное значение должно содержать минимум 3 символа");
		} else {
			setValue(promptValue);
			setError("");
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			setList((updatedList) => [
				...updatedList,
				{ id: Date.now(), value, date: formatedDate(Date.now()) },
			]);
			setValue("");
			setError("");
		}
	};

	const addZero = (num) => {
		return String(num).length === 1 ? `0${num}` : num;
	};

	const formatedDate = (ms) => {
		const dateForFormat = new Date(ms);
		const year = addZero(dateForFormat.getFullYear());
		const month = addZero(dateForFormat.getMonth()) + 1;
		const numberDate = addZero(dateForFormat.getDate());
		const hour = addZero(dateForFormat.getHours());
		const minute = addZero(dateForFormat.getMinutes());
		const second = addZero(dateForFormat.getSeconds());

		return `${numberDate}.${month}.${year} ${hour}:${minute}:${second}`;
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles["page-heading"]}>Ввод значения</h1>
				<p className={styles["no-margin-left"]}>
					Текущее значение <code>value</code>: "
					<output className={styles["current-value"]}>{value}</output>
					"
				</p>
				{error !== "" && <div className={styles.error}>{error}</div>}
				<div className={styles["buttons-container"]}>
					<button
						className={styles.button}
						onClick={onInputButtonClick}
					>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueValid}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles["list-container"]}>
					<h2 className={styles["list-heading"]}>Список:</h2>
					{list.length === 0 ? (
						<p className={styles["no-margin-left"]}>
							Нет добавленных элементов
						</p>
					) : (
						<ul className={styles.list}>
							{list.map(({ id, value, date }) => (
								<li className={styles["list-item"]} key={id}>
									{value} - {date}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
