import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/logo.png'
import { levels, calculateImc, Level } from './helpers/imc'
import leftArrowImage from './assets/left.png'
import { GridItem } from './components/GridItem'

const App = () => {

  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField))
    } else {
      alert('Preencha altura e pesso')
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  return (
    <div className={styles.main}>
        <header>
          <div className={styles.headerContainer}>
            <img src={poweredImage} width="150px" />
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Orcanização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

            <input 
              type="number" 
              placeholder='Digite a sua altura. EX 1.5 (em metros'
              value={heightField > 0 ? heightField:''}
              onChange={e=>setHeightField(parseFloat(e.target.value))}
              disabled={toShow?true:false}
            />
            <input 
              type="number" 
              placeholder='Digite o seu peso. EX 75.3 (em Kg'
              value={weightField > 0 ? weightField:''}
              onChange={e=>setWeightField(parseFloat(e.target.value))}
              disabled={toShow?true:false}
            />
            <button disabled={toShow?true:false} onClick={handleCalculateButton}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow &&
            
              <div className={styles.grid}>
                {levels.map((item, key)=>(
                  <GridItem key={key} item={item}/>
                ))}
              </div>

            }
            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} width="25" alt="" />
                </div>
                  <GridItem item={toShow}/>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default App;