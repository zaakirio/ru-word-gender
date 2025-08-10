import { useState } from 'react'
import { identifyGender, getGenderAccentColor, getGenderTextColor } from './utils/genderIdentifier'
import { translations } from './utils/translations'
import './App.css'

function App() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState(null)
  const [language, setLanguage] = useState('ru')
  
  const t = translations[language]

  const handleInputChange = (e) => {
    const inputWord = e.target.value
    setWord(inputWord)
    
    if (inputWord.trim()) {
      const genderResult = identifyGender(inputWord, language)
      setResult(genderResult)
    } else {
      setResult(null)
    }
  }

  const handleClear = () => {
    setWord('')
    setResult(null)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  const getGenderLabel = (gender) => {
    switch(gender) {
      case 'masculine':
        return t.masculine
      case 'feminine':
        return t.feminine
      case 'neuter':
        return t.neuter
      default:
        return t.unknown
    }
  }

  const getReason = (result) => {
    if (!result || !result.reasonKey) return ''
    
    const key = result.reasonKey
    let text = t[key] || ''
    
    if (key === 'endsWithConsonant' && result.lastChar) {
      text = `${t.endsWithConsonant} "${result.lastChar}"`
    } else if (key === 'endsWithLetter' && result.lastChar) {
      text = `${t.endsWithLetter} "${result.lastChar}"`
    } else if (key === 'endsWithPattern' && result.pattern) {
      text = `${t.endsWithPattern} "-${result.pattern}"`
    }
    
    return text
  }

  return (
    <div className="app">
      <div className="container">
        <div className="language-toggle">
          <button 
            className={`lang-option ${language === 'ru' ? 'active' : ''}`}
            onClick={() => setLanguage('ru')}
          >
            РУ
          </button>
          <span className="lang-separator">/</span>
          <button 
            className={`lang-option ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>

        <div className="header">
          <h1 className="title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        <div className="input-container">
          <input
            type="text"
            value={word}
            onChange={handleInputChange}
            placeholder={t.placeholder}
            className={`word-input ${result && result.error ? 'input-error' : ''}`}
            autoFocus
          />
          {word && (
            <button 
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {result && (
          <div className="result-container">
            {result.error ? (
              <div className="validation-message">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="validation-icon">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11.5" r="0.5" fill="currentColor"/>
                </svg>
                <span className="validation-text">{getReason(result)}</span>
              </div>
            ) : result.gender !== 'unknown' ? (
              <div 
                className="result-card"
                style={{ 
                  backgroundColor: getGenderAccentColor(result.gender),
                  borderColor: getGenderTextColor(result.gender)
                }}
              >
                <div className="gender-label-container">
                  <span 
                    className="gender-label"
                    style={{ color: getGenderTextColor(result.gender) }}
                  >
                    {getGenderLabel(result.gender)}
                  </span>
                </div>
                <p className="reason">{getReason(result)}</p>
              </div>
            ) : null}
          </div>
        )}

        <div className="rules-container">
          <div className="rules-grid">
            <div className="rule">
              <div className="rule-header">
                <span className="rule-letter">М</span>
                <span className="rule-title">{t.masculineShort}</span>
              </div>
              <div className="rule-examples">
                {t.masculineRules}<br/>
                <span className="example">{t.masculineExamples}</span>
              </div>
            </div>
            
            <div className="rule">
              <div className="rule-header">
                <span className="rule-letter">Ж</span>
                <span className="rule-title">{t.feminineShort}</span>
              </div>
              <div className="rule-examples">
                {t.feminineRules}<br/>
                <span className="example">{t.feminineExamples}</span>
              </div>
            </div>
            
            <div className="rule">
              <div className="rule-header">
                <span className="rule-letter">С</span>
                <span className="rule-title">{t.neuterShort}</span>
              </div>
              <div className="rule-examples">
                {t.neuterRules}<br/>
                <span className="example">{t.neuterExamples}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App