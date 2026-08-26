const home = async (req, res) => {
  res.render('index.ejs');
};

const about = async (req, res) => {
  res.render('about.ejs');
};

module.exports = {
  home, about
};
