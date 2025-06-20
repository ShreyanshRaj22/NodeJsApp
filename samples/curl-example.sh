# Test with raw text
curl -X POST http://localhost:3000/process-meeting \
  -H "Content-Type: application/json" \
  -d '{"text":"Team Sync – May 26\n\n- We’ll launch the new product on June 10.\n- Ravi to prepare onboarding docs by June 5.\n- Priya will follow up with logistics team on packaging delay.\n- Beta users requested a mobile-first dashboard."}'

# Test with file upload
curl -X POST http://localhost:3000/process-meeting \
  -F "file=@samples/team-sync-1.txt"
