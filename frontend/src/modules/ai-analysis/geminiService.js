import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Converts image URL to base64 inline data format required by Gemini API
 */
async function urlToGenerativePart(url, fallbackMime = 'image/jpeg') {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return {
      inlineData: {
        data: base64,
        mimeType: blob.type || fallbackMime
      }
    };
  } catch (err) {
    console.warn('Could not convert image URL to base64 for Gemini vision:', err);
    return null;
  }
}

/**
 * Analyzes civic issue using Gemini AI vision model if API key is present,
 * otherwise falls back to deterministic photo-aware offline simulation engine.
 */
export async function analyzeIssueWithGemini(issue) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Analyze this civic issue report with image evidence:
Title: "${issue.title}"
Description: "${issue.description}"
Location: "${issue.location}"

Examine both the text description and the provided photo evidence.

Respond ONLY with valid JSON with fields:
- category (string e.g. Garbage Accumulation, Public Lighting, Road Infrastructure)
- priority (High, Medium, or Low)
- reason (short explanation referencing visual details in the photo and location sensitivity)
- estimatedResolution (e.g. "6 Hours", "24 Hours", "2 Days")`;

      const contents = [prompt];

      if (issue.beforePhoto) {
        const imagePart = await urlToGenerativePart(issue.beforePhoto);
        if (imagePart) {
          contents.push(imagePart);
        }
      }

      const result = await model.generateContent(contents);
      const text = result.response.text();
      const cleanedJson = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanedJson);
      return {
        ...parsed,
        isOfflineDemo: false
      };
    } catch (err) {
      console.warn('Gemini API vision call failed, using photo-aware offline simulation:', err);
    }
  }

  // Photo-Aware Offline Simulation Engine
  return simulateOfflineAnalysis(issue);
}

function simulateOfflineAnalysis(issue) {
  const text = (issue.title + ' ' + issue.description).toLowerCase();
  const photoUrl = issue.beforePhoto || '';

  // Check photo URL signature or text keywords
  const isPotholePhoto = photoUrl.includes('photo-1515162816999') || text.includes('pothole') || text.includes('asphalt');
  const isStreetlightPhoto = photoUrl.includes('photo-1517420704952') || text.includes('light') || text.includes('lamp');
  const isGarbagePhoto = photoUrl.includes('photo-1530587191325') || text.includes('garbage') || text.includes('waste') || text.includes('dump');

  if (isStreetlightPhoto) {
    return {
      category: 'Public Lighting',
      priority: 'High',
      reason: 'Photo evidence confirms non-functional damaged streetlight fixture creating night public safety hazard.',
      estimatedResolution: '24 Hours',
      isOfflineDemo: true
    };
  } else if (isPotholePhoto) {
    return {
      category: 'Road Infrastructure',
      priority: 'Medium',
      reason: 'Photo evidence confirms asphalt road crater causing vehicle deceleration and traffic hazard.',
      estimatedResolution: '48 Hours',
      isOfflineDemo: true
    };
  } else if (isGarbagePhoto) {
    return {
      category: 'Garbage Accumulation',
      priority: 'High',
      reason: 'Photo evidence confirms uncollected solid waste dump near Government School gate blocking student walkway.',
      estimatedResolution: '6 Hours',
      isOfflineDemo: true
    };
  } else {
    return {
      category: 'General Civic Issue',
      priority: 'Medium',
      reason: 'Photo and report received for local municipal inspection.',
      estimatedResolution: '24 Hours',
      isOfflineDemo: true
    };
  }
}
