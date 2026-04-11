export async function generateRoadmap(profileData) {
  const { role, skills, interests, githubProfile } = profileData;

  const prompt = `
    You are an expert technical career coach. I need a concrete, week-by-week 6-month learning roadmap.
    
    Target Role: ${role}
    Current Skills: ${skills}
    Interests: ${interests || 'None specified'}
    GitHub Profile Context: ${githubProfile ? `Has ${githubProfile.public_repos} public repos, bio: "${githubProfile.bio}"` : 'No GitHub provided.'}

    REQUIREMENTS:
    - Output ONLY valid JSON containing the roadmap. No markdown fences around the JSON, no explanations.
    - Analyze the skill gap based on current skills and target role.
    
    JSON STRUCTURE:
    {
      "gapAnalysis": "A short summary of skill gaps",
      "months": [
        {
          "month": 1,
          "focus": "Month focus summary",
          "weeks": [
            {
              "week": 1,
              "title": "Week Topic",
              "tasks": [
                { "id": "task-m1-w1-t1", "description": "Specific task 1" },
                { "id": "task-m1-w1-t2", "description": "Specific task 2" }
              ],
              "resources": ["Resource 1 link or name"],
              "project": "Mini project idea for this week"
            }
          ]
        }
        // ... up to month 6
      ]
    }
  `;

  const apiKey = "AIzaSyA1xytilX77En1m1CA9s7Ux9KxgrYKesRs";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'Failed to generate roadmap from Gemini API');
  }

  const data = await response.json();
  const textOutput = data.candidates[0].content.parts[0].text;
  
  try {
    return JSON.parse(textOutput);
  } catch (e) {
    // Fallback if the model somehow returns markdown wrapped json
    const jsonMatch = textOutput.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    throw new Error('Could not parse Gemini JSON response');
  }
}
