var ebs = "http://3.143.3.162"

export function uploadScore(score) {
  fetch(ebs + "/scores", {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + window.Twitch.ext.viewer.sessionToken
    },
    body: {
      score: score
    }
  })
    .then(resp => {
      return resp.json();
    })
}
