const consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

const masculineExceptions = {
  'папа': true,
  'дядя': true,
  'дедушка': true,
  'мужчина': true,
  'юноша': true,
  'парнишка': true,
  'дедуля': true,
  'батя': true,
  'братишка': true
};

const neuterExceptions = {
  'время': true,
  'имя': true,
  'кофе': true
};

const softSignFemininePatterns = [
  'ость', 'есть', 'знь', 'сть', 'бь', 'вь', 'дь', 'зь', 'ль', 'мь', 'нь', 'пь', 'рь', 'ть', 'фь', 'щь'
];

const softSignMasculinePatterns = [
  'тель', 'арь', 'ырь', 'орь'
];

function isCyrillic(text) {
  return /^[а-яА-ЯёЁ\s-]+$/.test(text);
}

function hasLatinCharacters(text) {
  return /[a-zA-Z]/.test(text);
}

function hasNumbers(text) {
  return /\d/.test(text);
}

export function identifyGender(word, lang = 'ru') {
  if (!word || word.trim() === '') {
    return { gender: null, confidence: 0, reasonKey: 'pleaseEnterWord' };
  }
  
  const trimmedWord = word.trim();
  
  if (!isCyrillic(trimmedWord)) {
    if (hasLatinCharacters(trimmedWord)) {
      return { 
        gender: 'invalid', 
        confidence: 0, 
        reasonKey: 'useCyrillic',
        error: true 
      };
    }
    if (hasNumbers(trimmedWord)) {
      return { 
        gender: 'invalid', 
        confidence: 0, 
        reasonKey: 'noNumbers',
        error: true 
      };
    }
    return { 
      gender: 'invalid', 
      confidence: 0, 
      reasonKey: 'invalidSymbols',
      error: true 
    };
  }

  const lowercaseWord = word.toLowerCase().trim();
  const lastChar = lowercaseWord[lowercaseWord.length - 1];
  
  if (masculineExceptions[lowercaseWord]) {
    return {
      gender: 'masculine',
      confidence: 100,
      reasonKey: 'exceptionMasculine'
    };
  }
  
  if (neuterExceptions[lowercaseWord]) {
    return {
      gender: 'neuter',
      confidence: 100,
      reasonKey: 'exceptionNeuter'
    };
  }
  
  if (consonants.includes(lastChar) || lastChar === 'й') {
    return {
      gender: 'masculine',
      confidence: 95,
      reasonKey: 'endsWithConsonant',
      lastChar: lastChar
    };
  }
  
  if (lastChar === 'а' || lastChar === 'я') {
    return {
      gender: 'feminine',
      confidence: 90,
      reasonKey: 'endsWithLetter',
      lastChar: lastChar
    };
  }
  
  if (lastChar === 'о' || lastChar === 'е' || lastChar === 'ё') {
    return {
      gender: 'neuter',
      confidence: 95,
      reasonKey: 'endsWithLetter',
      lastChar: lastChar
    };
  }
  
  if (lastChar === 'ь') {
    for (const pattern of softSignMasculinePatterns) {
      if (lowercaseWord.endsWith(pattern)) {
        return {
          gender: 'masculine',
          confidence: 85,
          reasonKey: 'endsWithPattern',
          pattern: pattern
        };
      }
    }
    
    for (const pattern of softSignFemininePatterns) {
      if (lowercaseWord.endsWith(pattern)) {
        return {
          gender: 'feminine',
          confidence: 85,
          reasonKey: 'endsWithPattern',
          pattern: pattern
        };
      }
    }
    
    return {
      gender: 'feminine',
      confidence: 70,
      reasonKey: 'softSignProbablyFeminine'
    };
  }
  
  return {
    gender: 'unknown',
    confidence: 0,
    reasonKey: 'cannotDetermine'
  };
}

export function getGenderLabel(gender) {
  switch(gender) {
    case 'masculine':
      return 'Мужской род';
    case 'feminine':
      return 'Женский род';
    case 'neuter':
      return 'Средний род';
    default:
      return 'Неизвестно';
  }
}

export function getGenderAccentColor(gender) {
  switch(gender) {
    case 'masculine':
      return 'rgba(209, 173, 116, 0.12)';
    case 'feminine':
      return 'rgba(192, 132, 252, 0.12)';
    case 'neuter':
      return 'rgba(129, 140, 248, 0.12)';
    default:
      return 'rgba(148, 163, 184, 0.08)';
  }
}

export function getGenderTextColor(gender) {
  switch(gender) {
    case 'masculine':
      return '#D1AD74';
    case 'feminine':
      return '#C084FC';
    case 'neuter':
      return '#818CF8';
    default:
      return '#64748B';
  }
}