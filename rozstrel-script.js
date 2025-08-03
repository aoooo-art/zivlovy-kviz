
document.getElementById('quiz-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const answers = {};
  const counts = {
    země: 0,
    voda: 0,
    vzduch: 0,
    oheň: 0,
    duch: 0
  };

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  let allAnswered = true;

  questions.forEach(q => {
    const val = form[q].value;
    if (val) {
      counts[val]++;
      answers[q] = val;
    } else {
      allAnswered = false;
    }
  });

  const error = document.getElementById('error-msg');
  const rozstrel = document.getElementById('rozstrel');
  rozstrel.innerHTML = '';
  rozstrel.style.display = 'none';
  error.classList.remove('show');

  if (!allAnswered) {
    error.classList.add('show');
    error.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const entries = Object.entries(counts);
  entries.sort((a, b) => b[1] - a[1]);
  const top = entries[0][1];
  const topElements = entries.filter(e => e[1] === top);

  if (topElements.length === 1) {
    const zivel = topElements[0][0];
    window.location.href = `/zivel-${zivel}`;
    return;
  }

  const z1 = topElements[0][0];
  const z2 = topElements[1][0];

  const rozstrelOtazky = {
    'duch|oheň': ['uhlík, co ještě žhne?', 'sen, co se nikdy nevrátí?'],
    'duch|voda': ['rosa na kůži?', 'pocit, který už nevíš, odkud přišel?'],
    'duch|vzduch': ['smích, co zůstane ve vzduchu?', 'přítomnost, kterou nelze pojmenovat?'],
    'duch|země': ['otisk nohy ve vlhké hlíně?', 'šeptnutí, které nikdo neslyšel?'],
    'oheň|voda': ['tůň, co odráží svět?', 'plamen, co všechno pohltí?'],
    'oheň|vzduch': ['poryv, co rozhází vlasy?', 'jiskra, co rozsvítí oči?'],
    'oheň|země': ['hliněná pec, co tiše hřeje?', 'sopka, co si nenechá nic líbit?'],
    'voda|vzduch': ['řeka, co omývá břehy?', 'mrak, co mění tvar?'],
    'voda|země': ['kořen prorážející skálu?', 'kapka, co si najde cestu?'],
    'vzduch|země': ['kámen, co pamatuje?', 'list, co se nikdy nevrací?']
  };

  const klíč = [z1, z2].sort().join('|');
  const otázky = rozstrelOtazky[klíč];

  if (!otázky) {
    alert('Chybí rozstřelová otázka pro kombinaci: ' + klíč);
    return;
  }

  rozstrel.innerHTML = `
    <fieldset>
      <legend>Rozhodující otázka: Cítíš se spíš jako…</legend>
      <label><input type="radio" name="rozstrel" value="${z1}"> ${otázky[0]}</label>
      <label><input type="radio" name="rozstrel" value="${z2}"> ${otázky[1]}</label>
      <button type="button" class="button-muj" id="rozstrel-submit">Rozhodnout!</button>
    </fieldset>
  `;
  rozstrel.style.display = 'block';
  rozstrel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('rozstrel-submit').addEventListener('click', function () {
    const val = form['rozstrel'].value;
    if (val) {
      window.location.href = `/zivel-${val}`;
    }
  });
});

console.log('Rozstrel JS běží!');
