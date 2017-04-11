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

        [HttpPost]
        public JsonResult IncrementCountLike(string idHero)
        {
            Hero hero = db.Hero.Find(Int32.Parse(idHero));
            hero.CountLike++;
            db.SaveChanges();
            var json = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(db.Hero.Find(Int32.Parse(idHero)));
            return Json(json, JsonRequestBehavior.AllowGet); ;
        }

        public ActionResult AboutProject()
        {
            return View();
        }
    }
}