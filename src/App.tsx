import { ChangeEvent, useState } from 'react'

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return
    getSearchOptions(value)
  }

  const onOptionSelect = (option: any) => {
    // do somethings :)
  }

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-orange-400 via-red-400 to-lime-400 h-[100vh] w-full">
      <section className="bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg rounded w-full  md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] text-zinc-600 ">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black"> Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>

        <div className="relative  flex mt-10 md:mt-4 ">
          <input
            type="text"
            value={term}
            onChange={onInputChange}
            className="px-2 rounded-l-md py-1 border-2 border-white"
          />
          <ul className="absolute top-9 bg-white ml-1 mt-1 rounded-b-md">
            {options.map((item: { name: string }, index) => (
              <li key={item.name + '-' + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <button className="rounded-r-md  border-2 border-zinc-100 hover:bg-pink-500 transition-all duration-200 hover:border-white hover:text-white text-zinc-100 px-2 py-1 cursor-pointer ">
            search
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
