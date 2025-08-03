console.log('Rozstrel JS běží!');
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

  // Plichta – zobrazit rozstřelovou otázku
  const z1 = topElements[0][0];
  const z2 = topElements[1][0];

  const rozstrelOtazky = {
    'země|voda': ['kořen prorážející skálu?', 'kapka, co si najde cestu?'],
    'země|vzduch': ['kámen, co pamatuje?', 'list, co se nikdy nevrací?'],
    'země|oheň': ['hliněná pec, co tiše hřeje?', 'sopka, co si nenechá nic líbit?'],
    'země|duch': ['otisk nohy ve vlhké hlíně?', 'šeptnutí, které nikdo neslyšel?'],
    'voda|vzduch': ['řeka, co omývá břehy?', 'mrak, co mění tvar?'],
    'voda|oheň': ['tůň, co odráží svět?', 'plamen, co všechno pohltí?'],
    'voda|duch': ['rosa na kůži?', 'pocit, který už nevíš, odkud přišel?'],
    'vzduch|oheň': ['poryv, co rozhází vlasy?', 'jiskra, co rozsvítí oči?'],
    'vzduch|duch': ['smích, co zůstane ve vzduchu?', 'přítomnost, kterou nelze pojmenovat?'],
    'oheň|duch': ['uhlík, co ještě žhne?', 'sen, co se nikdy nevrátí?']
  };

  const klíč = [z1, z2].sort().join('|');
  const otázky = rozstrelOtazky[klíč];

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
