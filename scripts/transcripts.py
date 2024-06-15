from youtube_transcript_api import YouTubeTranscriptApi
import sys
import json

def get_transcripts(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        transcripts = []
        for transcript in transcript_list:
            transcripts.append(transcript.fetch())
        return transcripts
    except Exception as e:
        return {'error': str(e)}

def main():
    if len(sys.argv) != 2:
        print(json.dumps({'error': 'Usage: python scrape.py <video_id>'}))
        return

    video_id = sys.argv[1]
    transcripts = get_transcripts(video_id)
    print(json.dumps(transcripts))

if __name__ == '__main__':
    main()
