using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebEWT.Models;

namespace WebEWT.Controllers
{
    public class HomeController : Controller
    {
        private HeroDBEntities db = new HeroDBEntities();
        public ActionResult Index()
        {
            return View(db.Hero.ToList());
        }

        public ActionResult AboutProject()
        {
            return View();
        }
    }
}