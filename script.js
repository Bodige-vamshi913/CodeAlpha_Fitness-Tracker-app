
    const activityInput = document.getElementById('activity');
    const caloriesInput = document.getElementById('calories');
    const stepsInput = document.getElementById('steps');
    const addBtn = document.getElementById('addBtn');
    const tableBody = document.getElementById('activityTable');
    const totalCaloriesEl = document.getElementById('totalCalories');
    const totalStepsEl = document.getElementById('totalSteps');
    const progressBar = document.getElementById('progress');

    let activities = JSON.parse(localStorage.getItem('fitnessData')) || [];

    function renderTable() {
      tableBody.innerHTML = '';
      let totalCalories = 0;
      let totalSteps = 0;

      activities.forEach(a => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${a.date}</td>
          <td>${a.activity}</td>
          <td>${a.calories}</td>
          <td>${a.steps}</td>
        `;
        tableBody.appendChild(row);
        totalCalories += a.calories;
        totalSteps += a.steps;
      });

      totalCaloriesEl.textContent = totalCalories;
      totalStepsEl.textContent = totalSteps;
      progressBar.style.width = Math.min((totalSteps / 10000) * 100, 100) + '%';
    }

    addBtn.addEventListener('click', () => {
      const activity = activityInput.value.trim();
      const calories = parseInt(caloriesInput.value);
      const steps = parseInt(stepsInput.value);
      if (!activity || !calories || !steps) {
        alert('Please fill all fields!');
        return;
      }
      const newActivity = {
        date: new Date().toLocaleDateString(),
        activity,
        calories,
        steps
      };
      activities.push(newActivity);
      localStorage.setItem('fitnessData', JSON.stringify(activities));
      activityInput.value = '';
      caloriesInput.value = '';
      stepsInput.value = '';
      renderTable();
    });

    renderTable();


